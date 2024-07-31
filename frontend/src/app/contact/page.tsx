'use client';

import axios from 'axios';

import { useState, useEffect } from "react";


export default  function Contact(){

    const [data, setData] = useState<string|null>(null);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
            const getResponse = async () => {
                try{
                const response = await axios.get('http://localhost:8080');
                setData(response.data);
                }
                catch (error){
                    if(axios.isAxiosError(error)){
                        setError(error.message);
                    }
                    else {
                        setError("unexpected error");
                    }
                }

            };
            getResponse();
        },
        []);

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Contact
                    <code className="font-mono font-bold"></code>
                </p>
            </div>

            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                API
                {error ? (<div>Error: {error}</div>) : data ? (<div>Data: {data}</div>) : (<div>Loading data</div>)}
            </div>

        </main>
)
}