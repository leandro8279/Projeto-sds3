import axios from "axios";
import { useEffect, useState } from "react";
import { SalePage } from "types/Sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

export default function NavBar() {
  const [page, setPage] = useState<SalePage>({
    last: true,
    first: true,
    number: 0,
    totalElements: 0,
    numberOfElements: 0,
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/sales?page=0&size=20&sort=date,desc`)
      .then((response) => {
        console.log(response.data);

        setPage(response.data);
      });
  }, []);
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Data</th>
            <th>Vendedor</th>
            <th>Clientes visitados</th>
            <th>Negócios fechados</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {page.content?.map((item) => (
            <tr key={item.id}>
              <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
              <td>{item.seller.name}</td>
              <td>{item.visited}</td>
              <td>{item.deals}</td>
              <td className="text-secondary">R$ {item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
