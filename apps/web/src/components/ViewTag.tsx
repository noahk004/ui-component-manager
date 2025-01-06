interface ViewTagProps {
    label: string;
}

export default function ViewTag({ label }: ViewTagProps) {
    return (
        <div className="px-6 py-1 bg-gray-200 rounded-lg text-sm">{label}</div>
    );
}
