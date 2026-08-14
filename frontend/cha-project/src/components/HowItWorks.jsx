import Button from "./Button";
import { Gift } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import { MessageCircleHeart } from 'lucide-react';
import { HouseHeart } from 'lucide-react';



const HowItWorks = ({ fechar }) => {

    return (
        <div>

            <h2
                className="
                text-3xl
                text-center
                font-dancing
                mb-6
                "
            >
                Como funciona?
            </h2>


            <div className="
                flex
                flex-col
                gap-5
                text-gray-700
            ">


                <div>
                    <div className="flex items-center gap-2 text-red-500">
                        <Gift className="w-5 h-5"/>

                        <h3 className="font-semibold text-lg">
                            Lista de presentes
                        </h3>
                    </div>

                    <p className="text-sm mt-1">
                        Escolha um presente que deseja nos presentear.
                        Ao reservar, ele ficará marcado como escolhido
                        para evitar presentes repetidos.
                    </p>
                </div>



                <div>
                    <div className="flex items-center gap-2 text-orange-400">
                    <CircleDollarSign className="w-5 h-5"/>
                    <h3 className="font-semibold text-lg">
                        Cotas
                    </h3>
                    </div>

                    <p className="text-sm mt-1">
                        Alguns eletrodomésticos possuem valores mais altos.
                        Por isso criamos as cotas, onde você pode contribuir
                        com qualquer uma disponível.
                    </p>
                </div>



                <div>
                    <div className="flex items-center gap-2 text-pink-300">
                        <MessageCircleHeart className="w-5 h-5"/>

                        <h3 className="font-semibold text-lg">
                            Recados
                        </h3>
                    </div>

                    <p className="text-sm mt-1">
                        Você também pode deixar uma mensagem para nós.
                        Ficaremos muito felizes em guardar esse carinho.
                    </p>
                </div>



                <div>
                    <div className="flex items-center gap-2 text-purple-800">
                        <HouseHeart className="w-5 h-5"/>
                        <h3 className="font-semibold text-lg">
                            Confirmação de presença
                        </h3>
                    </div>

                    <p className="text-sm mt-1">
                        Confirme sua presença informando seu nome e
                        quantidade de pessoas que irão participar.
                    </p>
                </div>


            </div>


            <div className="
                flex
                justify-center
                mt-8
            ">

                <Button
                    variant="secondary"
                    onClick={fechar}
                >
                    Entendi
                </Button>

            </div>


        </div>
    );
};


export default HowItWorks;