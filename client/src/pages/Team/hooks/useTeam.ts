import { useState, useEffect } from "react";
import { getAvailability } from "../../../services/teamService";
import type { AvailabilityData } from "../../../types/team";

export function useTeam() {
    const [teamAvailability, setTeamAvailability] = useState<AvailabilityData[]>([])

    useEffect(() => {
        const loadTeam = async () => {
            const availabilityData = await getAvailability()

            setTeamAvailability(availabilityData)
        };

        loadTeam()
    }, [])


return {
    teamAvailability,
}

}