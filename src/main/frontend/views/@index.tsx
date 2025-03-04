import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    menu: {
        exclude: true
    },
};

export default function MainView() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/register-storage');
    }, [navigate]);
}