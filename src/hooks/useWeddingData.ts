import { useState, useEffect } from "react";
import type { WeddingData, Supplier, Installment } from "../types";
import { INITIAL_DATA } from "../data/initialData";

const STORAGE_KEY = "wedding_manager_data";

export const useWeddingData = () => {
  const [data, setData] = useState<WeddingData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addSupplier = (supplier: Supplier) => {
    setData(prev => ({
      ...prev,
      fornecedores: [...prev.fornecedores, supplier]
    }));
  };

  const updateSupplier = (id: string, updated: Partial<Supplier>) => {
    setData(prev => ({
      ...prev,
      fornecedores: prev.fornecedores.map(s => s.id === id ? { ...s, ...updated } : s)
    }));
  };

  const deleteSupplier = (id: string) => {
    setData(prev => ({
      ...prev,
      fornecedores: prev.fornecedores.filter(s => s.id !== id)
    }));
  };

  const updateWeddingInfo = (info: Partial<WeddingData["casal"]>) => {
    setData(prev => ({
      ...prev,
      casal: { ...prev.casal, ...info }
    }));
  };

  const updateConfig = (config: Partial<WeddingData["configuracoes"]>) => {
    setData(prev => ({
      ...prev,
      configuracoes: { ...prev.configuracoes, ...config }
    }));
  };

  const updateInstallment = (supplierId: string, installmentId: string, updated: Partial<Installment>) => {
    setData(prev => ({
      ...prev,
      fornecedores: prev.fornecedores.map(s => {
        if (s.id !== supplierId) return s;
        
        const newParcelas = s.parcelas.map(p => {
          if (p.id !== installmentId) return { ...p };
          return { ...p, ...updated };
        });

        const allPaid = newParcelas.every(p => p.status === "pago");
        const somePaid = newParcelas.some(p => p.status === "pago");
        let status: Supplier["status"] = "pendente";
        if (allPaid) status = "pago";
        else if (somePaid) status = "parcial";

        return { ...s, parcelas: newParcelas, status };
      })
    }));
  };

  return {
    data,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    updateConfig,
    updateWeddingInfo,
    updateInstallment,
    reorderSuppliers: (suppliers: Supplier[]) => {
      setData(prev => ({ ...prev, fornecedores: suppliers }));
    }
  };
};
