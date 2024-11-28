import { EstimateResponseSchema } from "@/schemas/estimate-schema";

type DriversListProps = Pick<EstimateResponseSchema, "options">;

export default function DriversList({ options }: DriversListProps) {
  return (
    <div className="flex flex-col  justify-center gap-2">
      {options.map((option) => (
        <div key={option.id} className="flex flex-col justify-center gap-2">
          <span>Nome: {option.name}</span>
          <span>Descrição: {option.description}</span>
          <span>Veículo: {option.vehicle}</span>
          <span>Avaliação: {option.review.rating}</span>
          <span>Comentário: {option.review.comment}</span>
          <span>
            Preço:{" "}
            {option.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
