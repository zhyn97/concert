function WarningPopUp({ active, content }) {
    return (
        <div className={`warning${active?' warning_active':''}`}>
            {content}
        </div>
    )
}

export default WarningPopUp;