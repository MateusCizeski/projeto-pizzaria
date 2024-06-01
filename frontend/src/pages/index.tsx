import { useContext, FormEvent, useState } from "react";
import Head from "next/head"
import styles from '../../styles/Home.module.scss';
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { toast } from 'react-toastify';

import Link from "next/link";
import { AuthContext } from "../contexts/AuthContent";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    let data = { email, password };

    if(email == '' || password == '') {
      toast.error("Preencha todos os campos.");
      return; 
    } 

    setLoading(true);
    signIn(data);

    setLoading(false);
  }

    return (
      <>
      <Head>
        <title>Pizza - Faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>        
        <div className={styles.login}>
          <h1>Faça seu login</h1>
         <form onSubmit={handleLogin}>
          <Input placeholder="Digite seu email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="Sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" loading={loading}>
            Acessar
          </Button>
          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastra-se
          </Link>
         </form>
        </div>
      </div>
      </>
    )
  }

  export const getServerSideProps = canSSRGuest(async (context) => {
    return {
      props: {}
    }
  })
  