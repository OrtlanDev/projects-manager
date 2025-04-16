import { Star } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { Button } from "../button";

interface FavoriteButtonProps extends HTMLAttributes<HTMLButtonElement> {
    filled?: boolean;
}

function FavoriteButton({ filled = false }: FavoriteButtonProps) {
    const [status, setStatus] = useState(filled);

    return (
        <Button variant="ghost" size="icon" onClick={() => setStatus(!status)}>
            <Star fill={status ? "currentColor" : "none"} />
        </Button>
    );
}

export default FavoriteButton;
