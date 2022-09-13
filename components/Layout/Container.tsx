const containerStyles = `
background: "rgba(179, 160, 255, 0.24)";
border-radius: "8px";
margin: "1em";
width: "54px";
height: "54px";
`


const Container = ({
  children,
  className = '',
}: {
  children: JSX.Element[] | JSX.Element
  className?: string
}) => <div className={`mx-12 sm:mx-24 md:mx-64 ${className}`} style={{background: "rgba(179, 160, 255, 0.24)", width: "600px", height: "800px", margin: "2em", borderRadius: "8px"}}>{children}</div>


export default Container
