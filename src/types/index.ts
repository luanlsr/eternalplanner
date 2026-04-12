export type PaymentStatus = "pago" | "parcial" | "pendente" | "atrasado";

export type PaymentType = "parcelado_fixo" | "entrada_parcelas" | "entrada_quitacao" | "percentual_restante" | "pagamento_unico";

export interface Installment {
  id: string;
  numero: number;
  valor: number;
  dataVencimento: string;
  status: "pago" | "pendente";
  dataPagamento?: string;
}

export interface Supplier {
  id: string;
  categoria: string;
  servico: string;
  fornecedor: string;
  valorTotal: number;
  tipoPagamento: PaymentType;
  dataContrato: string;
  regraPagamento?: string;
  parcelas: Installment[];
  status: PaymentStatus;
  observacoes?: string;
  order?: number;
}

export interface WeddingData {
  casal: {
    nome: string;
    data: string;
  };
  fornecedores: Supplier[];
  configuracoes: {
    orcamentoTotal: number;
    tema: "light" | "dark";
  };
}

export interface FinancialStats {
  totalOrcado: number;
  totalContratado: number;
  totalPago: number;
  totalRestante: number;
  porCategoria: Record<string, number>;
  porStatus: Record<PaymentStatus, number>;
  proximosVencimentos: {
    fornecedor: string;
    valor: number;
    data: string;
    parcela?: number;
    totalParcelas?: number;
  }[];
}
