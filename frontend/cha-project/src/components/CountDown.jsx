import Counter from "./Counter";
import useCountDown from "../hooks/useCountDown";

const CountDown = () => {
    const [day, hour, minute, second] = useCountDown("Dec 1, 2026 00:00:00")
    return ( 
        <div className="w-70 bg-white px-4">
            <h2 className="font-dancing text-center text-2xl mb-2">
                Falta pouco!
            </h2>

            <div className="flex justify-center gap-3">
                <Counter title="dias" number={day} />
                <Counter title="horas" number={hour} />
                <Counter title="minutos" number={minute} />
                <Counter title="segundos" number={second} />
            </div>
        </div>
        
     );
}
 
export default CountDown;