import { Button } from "@chakra-ui/react";

export default function Page404() {
    return (
        <>
            <h1>404 - Page Not Found</h1>
            <Button
                as="a"
                href="/"
            >
                Go Home
            </Button>
        </>
    );
}