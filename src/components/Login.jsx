export default function Login() {
    return (
        <div className="w-125 h-auto py-6 px-10 flex flex-col items-center gap-4">
            <h2 className="text-4xl ">Login</h2>
            <div className="w-full flex flex-col gap-2">
                <input className="w-full h-9 bg-Neutral pl-4 rounded-md " type="text" placeholder="nombre" />
                <input className="w-full h-9 bg-Neutral pl-4 rounded-md " type="password" placeholder="Password" />
            </div>
            <button className="w-full h-9  bg-Verde text-white font-bold rounded-2xl ">Guardar</button>
        </div>
    )
}