import { useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '@/src/contexts/AuthContent';

export function Header() {
    const { signOut } = useContext(AuthContext);
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                <img src="/logo.svg" width={190} height={60} />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/category">Categoria</Link>
                    <Link href="/product">Cardápio</Link>

                    <button onClick={signOut}><FiLogOut color='#fff' size={24}/></button>
                </nav>
            </div>
        </header>
    )
}