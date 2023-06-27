import axios from "axios";
const putReserva= async (id) => {
        const {data}= await axios.put(`http://localhost:3001/reservation/${id}`,
        {estado:"pagado"}
        ); 
        console.log(data)
        return data

}
export default putReserva;