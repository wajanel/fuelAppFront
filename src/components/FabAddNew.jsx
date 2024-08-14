export const FabAddNew = () => {

    const {onOpenModalBranch} = useUiStore();

    const handleClickNew = ()=>{
        setActiveData({
        })
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