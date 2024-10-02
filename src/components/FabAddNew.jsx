import React from 'react';
import { useUiStore } from '../hooks';

export const FabAddNew = () => {

    const {onOpenModalBranch} = useUiStore();

    const handleClickNew = ()=>{
        onOpenModalBranch();
    }

  return (
    <button 
        className="btn btn-primary fab"
        onClick={handleClickNew}
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}