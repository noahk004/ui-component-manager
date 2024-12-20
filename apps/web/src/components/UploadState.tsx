import React from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export type UploadStateType = "success" | "loading" | "error";

interface UploadStateProps {
    state: UploadStateType;
}

const UploadState = ({ state }: UploadStateProps) => {
    const stateConfig = {
        success: {
            icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
            message: "Module validation success",
        },
        loading: {
            icon: <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />,
            message: "Checking your component...",
        },
        error: {
            icon: <XCircle className="w-5 h-5 text-red-500" />,
            message: "Module validation failed",
        },
    };

    const { icon, message } = stateConfig[state];

    return (
        <div className="flex items-center gap-2">
            {icon}
            <span>{message}</span>
        </div>
    );
};

export default UploadState;
