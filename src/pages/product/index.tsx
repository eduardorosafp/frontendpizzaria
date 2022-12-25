import Head from 'next/head';
import styles from './styles.module.scss'
import {canSSRAuth} from '../../utils/canSSRAuth'
import {Header} from '../../components/Header'
import {FiUpload} from 'react-icons/fi'
import {useState, ChangeEvent} from 'react'

export default function Product(){

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, steImageAvatar] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement> ){

        if(!e.target.files){
            return;
        }
        const image = e.target.files[0];
        
        if(!image){
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            steImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }
    return(
        <>
        <Head>
            <title>
                Novo produto - Sujeito Pizzaria
            </title>
        </Head>
        <div>
         <Header/>  

         <main className={styles.container}>
            <h1>Novo Produto</h1>


            <form className={styles.form}>

               

                <label className={styles.labelAvatar}> 
                <span> 
                    <FiUpload size={30} color="#FFF"/>
                </span>

                <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/> 

                {avatarUrl && (
                   <img
                   className={styles.preview}
                    src= {avatarUrl}
                    alt="Foto do Produto"
                    width={250}
                    height={250}
                    />
                )}

                </label>

                <select>
                    <option>
                        Bebida
                    </option>
                    <option>
                       Pizzas
                    </option>
                </select>

                <input
                 type="text"
                placeholder="Digite o nome do produto"
                className={styles.input}
                />

                <input
                 type="text"
                placeholder="Preço do produto"
                className={styles.input}
                />


                <textarea
                placeholder="Descreva ser produto"
                className={styles.input}
                />

                <button className={styles.buttonAdd} type="submit"> 
                    Cadastrar
                </button>
            </form>

         </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return{
        props: {}
    }
})