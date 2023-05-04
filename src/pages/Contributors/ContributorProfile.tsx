import { memo } from "react";
import { Avatar, Tooltip, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Blockies from 'react-blockies';

import { isValidUrl } from "src/utilities/helper";
import { Contributor } from "src/types";

type ContributorProfileProps = {
    contributor: Contributor;
};

export function ContributorProfile({ contributor }: ContributorProfileProps) {

    return (
        <Tooltip
            label={contributor.name}
            aria-label={contributor.name}
        >
            <Link
                isExternal={isValidUrl(contributor.profile)}
                as={RouterLink}
                to={contributor.profile}
                padding={0}
                margin={0}
                textDecoration="none"
            >
                {contributor.avatar ?
                    <Avatar
                        p={1}
                        m={1}
                        src={contributor.avatar} />
                    :
                    <Blockies
                        seed={contributor.name}
                        scale={5}
                        size={8}
                        className="rounded-full" />}
            </Link>
        </Tooltip>
    );
}

export default memo(ContributorProfile, areEquals());

function areEquals(): ((prevProps: Readonly<ContributorProfileProps>, nextProps: Readonly<ContributorProfileProps>) => boolean) | undefined {
    return (prevProps, nextProps) => prevProps.contributor.name === nextProps.contributor.name;
}
