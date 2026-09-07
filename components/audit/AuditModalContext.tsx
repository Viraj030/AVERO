'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuditModal } from './AuditModal';

interface AuditModalContextType {
  openAudit: () => void;
  openAuditWithSpend: (spend?: string) => void;
  closeAudit: () => void;
  isAuditOpen: boolean;
  prefillSpend?: string;
  prefillObjective?: string;
  openAuditWithObjective?: (objective?: string) => void;
}

const AuditModalContext = createContext<AuditModalContextType>({
  openAudit: () => {},
  openAuditWithSpend: () => {},
  closeAudit: () => {},
  isAuditOpen: false,
  prefillSpend: undefined,
});

export function AuditModalProvider({ children }: { children: React.ReactNode }) {
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [prefillSpend, setPrefillSpend] = useState<string | undefined>();
  const [prefillObjective, setPrefillObjective] = useState<string | undefined>();

  const openAudit = useCallback(() => {
    setPrefillSpend(undefined);
    setPrefillObjective(undefined);
    setIsAuditOpen(true);
  }, []);

  const openAuditWithSpend = useCallback((spend?: string) => {
    setPrefillSpend(spend);
    setPrefillObjective(undefined);
    setIsAuditOpen(true);
  }, []);

  const openAuditWithObjective = useCallback((objective?: string) => {
    setPrefillSpend(undefined);
    setPrefillObjective(objective);
    setIsAuditOpen(true);
  }, []);

  const closeAudit = useCallback(() => {
    setIsAuditOpen(false);
  }, []);

  return (
    <AuditModalContext.Provider
      value={{
        openAudit,
        openAuditWithSpend,
        openAuditWithObjective,
        closeAudit,
        isAuditOpen,
        prefillSpend,
        prefillObjective,
      }}
    >
      {children}
      <AuditModal
        open={isAuditOpen}
        onClose={closeAudit}
        prefillSpend={prefillSpend}
        prefillObjective={prefillObjective}
      />
    </AuditModalContext.Provider>
  );
}

export function useAuditModal() {
  return useContext(AuditModalContext);
}
