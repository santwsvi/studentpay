import Button from '../ui/Button'

export default function VantagemCard({ vantagem, onResgatar, loading }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {vantagem.fotoUrl && (
        <img
          src={vantagem.fotoUrl}
          alt={vantagem.descricao}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4 space-y-3">
        <h4 className="text-base font-semibold text-gray-900 line-clamp-2">
          {vantagem.descricao}
        </h4>
        <p className="text-lg font-bold text-primary">
          {vantagem.custoMoedas} moedas
        </p>
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => onResgatar(vantagem)}
          loading={loading}
        >
          Resgatar
        </Button>
      </div>
    </div>
  )
}
