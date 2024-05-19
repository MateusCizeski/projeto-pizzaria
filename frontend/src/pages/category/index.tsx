import { FormEvent, useState } from "react";
import { Header } from "@/src/components/Header";
import styles from './styles.module.scss';
import Head from "next/head";
import { setupApiClient } from "@/src/services/api";
import { toast } from "react-toastify";
import { canSSRAuth } from "@/src/utils/canSSRAuth";

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === '') return;

        const apiClient = setupApiClient();
        await apiClient.post('/category', { name });

        toast.success("Categoria cadastrada com sucesso!");
        setName('');
    }

    return(
       <>
       <Head>
        <title>Nova categoria - Pizzaria</title>
       </Head>
       <div>
        <Header />
        <main className={styles.container}>
            <h1>Cadastrar categorias</h1>

            <form className={styles.form} onSubmit={handleRegister}>
                <input 
                  type="text" 
                  placeholder="Digite o nome na categoria" 
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}/>

                <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
            </form>
        </main>
       </div>
       </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    };
});