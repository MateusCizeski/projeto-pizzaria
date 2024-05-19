import Head from 'next/head';
import styles from './style.module.scss';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { Header } from '@/src/components/Header';
import { FiUpload } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { setupApiClient } from '@/src/services/api';
import { toast } from 'react-toastify';

type ItemProps = {
    id: string;
    name: string;
};

interface CategoryProps {
    categoryList: ItemProps[];
};

export default function Product({ categoryList }: CategoryProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<File | null>(null);
    const [categorys, setCategorys] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files;
        
        if(!file) return;
        
        const image = file[0];
        
        if(!image) return;

        if(image.type === 'image/jpg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image));
        }
    }

    function handleChangeCategory(event: any) {
        setCategorySelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error("preencha todos os campos!");
                return;
            }
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categorys[categorySelected].id);
            data.append('file', imageAvatar);
            const apiClient = setupApiClient();
            await apiClient.post('/product', data);

            toast.success('Produto cadastrado com sucesso.');

        }catch(err) {
            console.log(err);
            toast.error("Erro ao cadastrar produto.")
        }

        setName('');
        setPrice('');
        setAvatarUrl('');
        setDescription('');
        setImageAvatar(null);
    } 

    return (
        <>
        <Head>
            <title>Novo produto - Pizzaria</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container} onSubmit={handleRegister}>
                <h1>Novo produto</h1>

                <form className={styles.form}>
                 
                    <label className={styles.labelAvatar}>
                    <span>
                        <FiUpload size={30} color='#fff'/>
                    </span>

                    <input type="file" accept='image/png, image/jpg'onChange={handleFile} />

                    {avatarUrl && (
                        <img 
                            className={styles.preview}
                            src={avatarUrl}
                            alt="Foto do produto" 
                            width={250}
                            height={250}
                        />
                    )}

                    </label>

                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categorys.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>

                    <input 
                        type="text" 
                        placeholder='Digite o nome do produto' 
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder='Preço do produto' 
                        className={styles.input}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <textarea 
                        placeholder='Descreva seu produto' 
                        className={styles.input}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button className={styles.buttonAdd} type='submit'>Cadastrar</button>
                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get('/category'); 
    
    return {
        props: {
            categoryList: response.data
        }
    };
});