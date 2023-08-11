import { useState, useEffect } from 'react';
import { Project } from '../services/features/projectSlice';
import { Task } from '../app/pages/api/tasks';
import { Team, fetchTeamById } from '../app/pages/api/teams';

export default function useTeamData(data: Project | Task, isProject: boolean) {
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [teamDataIsLoading, setTeamDataIsLoading] = useState(false);
  const [teamDataError, setTeamDataError] = useState(null);

  useEffect(() => {
    if (isProject && (data as Project).team_id) {
      setTeamDataIsLoading(true);
      fetchTeamById((data as Project).team_id)
        .then((result) => {
          setTeamData(result);
          setTeamDataIsLoading(false);
        })
        .catch((err) => {
          setTeamDataError(err.message);
          setTeamDataIsLoading(false);
        });
    }
  }, [data, isProject]);

  return { teamData, teamDataIsLoading, teamDataError };
}
