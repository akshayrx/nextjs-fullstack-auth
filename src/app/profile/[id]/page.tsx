interface Params {
    id: string;
}

export default async function UserProfile({params}: { params: Params }){
    // await params
    const userid = await params.id;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
            <h1 className="text-xl">Profile Page</h1>
            <hr />
            <div className="flex flex-col justify-center items-start gap-2">
                <p className="text-4xl">user profile: <span className="bg-orange-500 text-zinc-900">{userid}</span></p>
            </div>
        </div>
    )
}