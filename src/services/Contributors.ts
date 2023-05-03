
import { Contributor } from "src/types";

export const fetchContributors = async (): Promise<Contributor[]> => {

    try {
        const response = await fetch('https://raw.githubusercontent.com/draos2q/caw-contributors/main/contributors.json');
        const result = await response.json();

        if (Array.isArray(result)) {

            return result.map((c) => {

                const _contributor: Contributor = {
                    id: c.id || '',
                    avatar: c.avatar || '',
                    name: c.name || '',
                    profile: c.profile || '',
                };

                return _contributor;
            })
        }

        return [];
    }
    catch (error) {
        return [];
    }
}