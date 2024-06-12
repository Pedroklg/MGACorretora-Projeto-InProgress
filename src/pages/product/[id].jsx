import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import toBrMoney from '../api/utils/toBrMoney';
import Image from 'next/image';

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/empresasImoveis?id=${id}`)
                .then(response => response.json())
                .then(data => setProduct(data))
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <title>{product.item.titulo}</title>
            <Header />
            <div className="flex-grow flex m-4">
                <div className="w-full grid grid-cols-12">
                    <div className="w-full grid grid-cols-12 my-10 col-span-12 md:col-start-4 md:col-end-10">

                        <div className='col-span-12 md:col-span-6'>
                            <div className="text-4xl font-bold my-6 col-span-12 text-red-800">
                                <h1>{product.item.titulo}</h1>
                            </div>

                            <div className='col-span-12'>
                                <div className='h-auto min-h-80 mb-5'>
                                    <Image src={encodeURIComponent(product.item.imagem)} alt={product.item.titulo} className="w-full" width={400} height={200}/>
                                </div>

                                <div className='flex flex-col p-5 shadow-lg rounded-lg mt-4'>
                                    <h1 className='text-xl font-semibold'>Descrição {product.tipo === 'Empresa' ? <span>da Empresa</span> : <span>do Imóvel</span>}:</h1>
                                    <p>{product.item.sobre_o_imovel}</p>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-0 md:col-span-1'></div>
                        <div className='col-span-12 md:col-span-5 flex flex-col gap-4 shadow-lg p-3 rounded-lg mt-5 md:mt-0'>

                            <div className='flex justify-between p-1 flex-col md:flex-row'>
                                <h1 className="font-semibold">Valor:</h1>
                                <p>{toBrMoney(product.item.valor_pretendido)}</p>
                            </div>

                            <div className='flex justify-between bg-gray-200 p-1 w-full'>
                                <h1 className="font-semibold">Estado:</h1>
                                <p>{product.item.estado}</p>
                            </div>

                            <div className='flex justify-between p-1'>
                                <h1 className="font-semibold">Cidade:</h1>
                                <p>{product.item.cidade}</p>
                            </div>

                            <div className='flex justify-between bg-gray-200 p-1 w-full'>
                                <h1 className="font-semibold">Motivo da Venda:</h1>
                                <p>{product.item.motivo_da_venda}</p>
                            </div>

                            <div className='flex justify-between p-1'>
                                <h1 className="font-semibold">Condições:</h1>
                                <p>{product.item.condicoes}</p>
                            </div>

                            <div className='flex justify-between bg-gray-200 p-1 w-full'>
                                <h1 className="font-semibold">Aceita Permuta:</h1>
                                <p>{product.item.aceita_permuta ? <span>Sim</span> : <span>Não</span>}</p>
                            </div>

                            <div className='flex justify-between p-1'>
                                <h1 className="font-semibold">Tem Dívida:</h1>
                                <p>{product.item.tem_divida ? <span>Sim</span> : <span>Não</span>}</p>
                            </div>

                            {product.tipo === 'Empresa' ?
                                <>
                                    <div className='flex justify-between bg-gray-200 p-1 w-full'>
                                        <h1 className="font-semibold">Categoria: </h1>
                                        <p>{product.item.categoria}</p>
                                    </div>
                                    <div className='flex justify-between p-1 w-full'>
                                        <h1 className="font-semibold">Tempo de Mercado:</h1>
                                        <p>{product.item.tempo_de_mercado} {product.item.tempo_de_mercado === 1 ? <span>ano</span> : <span>anos</span>}</p>
                                    </div>
                                    <div className='flex justify-between bg-gray-200 p-1 w-full'>
                                        <h1 className="font-semibold">Funcionários:</h1>
                                        <p>{product.item.funcionarios}</p>
                                    </div>
                                </>

                                :

                                <>
                                    <div className='flex justify-between bg-gray-200 p-1 w-full'>
                                        <h1 className="font-semibold">Área Construida:</h1>
                                        <p>{product.item.area_construida} m²</p>
                                    </div>
                                    <div className='flex justify-between p-1 w-full'>
                                        <h1 className="font-semibold">Área Útil:</h1>
                                        <p>{product.item.area_util} m²</p>
                                    </div>
                                    <div className='flex justify-between p-1 w-full bg-gray-200'>
                                        <h1 className="font-semibold">Finalidade:</h1>
                                        <p>{product.item.aluguel ? <span>Aluguel</span> : <span>Venda</span>}</p>
                                    </div>
                                </>

                            }
                            <div className='flex justify-between p-1 w-full'>
                                <h1 className="font-semibold">Código:</h1>
                                <p>{product.item.id}</p>
                            </div>
                        </div>
                        <div className='col-span-12 p-8'>
                            <p className='text-xs'>
                                *  Maiores detalhes, agendamento de visitas, através de nossos agentes de negócios nos telefones indicados. * Os valores financeiros foram descritos de acordo com informações fornecidas pelos proprietários da empresa, a MGA CORRETORA não realizou até o momento qualquer tipo de consultoria, auditoria ou diligência. Os compradores poderão realizar a etapa de diligência durante o período de compromisso de intenção de compra e venda.
                            </p>
                        </div>
                        <div className='col-span-12 flex justify-center items-center'>
                            <h1 className='text-lg'>Se interessou {product.tipo === 'Empresa' ? <span>pela empresa</span> : <span>pelo imóvel</span>}? Entre em Contato pelos meios aqui em baixo:</h1>
                        </div>
                        <div className="col-span-3 md:col-start-10"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;