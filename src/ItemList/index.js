import { React, useEffect, useState } from 'react'
import './index.css'

export default function Index(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        var getCategories = () => {
            const setOf = new Set();
            props.products.forEach((item) => { setOf.add(item.category) })
            const categories = [...setOf]
            setCategories(categories)
        }
        getCategories()
    }, [props.products])

    return (
        <div className="listOfItems" style={{ justifyContent: "center", display: "flex" }}>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => {
                        return (<><tr style={{textAlign:"left", fontWeight:"700"}}><td colSpan="2">{category}</td></tr>
                            {
                                props.products.filter((product) => product.category === category).map((item) => {
                                    return (<tr>
                                        <td className={item.stocked.toString()}>{item.name}</td>
                                        <td>{item.price}</td>
                                    </tr>)
                                })
                            }</>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
