import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import type {ViewConfig} from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    menu: {
        exclude: true
    },
};

export default function RedirectToView() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/register-storage", {replace: true});
    }, [navigate]);

    return null;

}