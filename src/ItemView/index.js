import React, { Component } from 'react'
import products from '../products.json'
import ItemList from '../ItemList'



export default class index extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            filter: false,
            products: products,
            categories: [],
            timer: null
        }
    }

    debounce = (callback, delay) => {
        return (() => {
            clearTimeout(this.state.timer)
            this.setState({ timer: setTimeout(callback, delay)})
        })
    }

    debounceSearch = () => {
        this.debounce(() => {
            this.filterMethod()
        }, 2000)()
    }

    filterMethod = () => {
        const text = this.state.searchText
        const stockFilter = this.state.filter
        if(text && stockFilter){
            const list = products.filter((items) => { return items.name.toLowerCase().startsWith(text.toLowerCase()) && items.stocked === true })
            this.setState({products: list})
        }
        else if(text && !stockFilter){
            const list = products.filter((items) => { return items.name.toLowerCase().startsWith(text.toLowerCase()) })
            this.setState({products: list})
        }
        else if(!text && stockFilter){
            const list = products.filter((items) => { return  items.stocked === true})
            this.setState({products: list})
        }
        else{
            this.setState({products: products})
        }
    }

    search = (e) => {
        this.setState({ searchText: e.target.value })
        this.debounceSearch()
    }

    stockFilter = (e) => {
        const value = this.state.filter
        this.setState({filter: !value },()=>this.filterMethod())
    }

    render() {
        return (
            <div className="listOfItems" style={{padding:"5px"}}>
                <div>
                    <input  style={{padding:"5px"}} id='searchtext' onChange={this.search} value={this.state.searchText} placeholder='Search...' />
                </div>
                <div style={{padding:"5px"}}>
                    <input  id='filterCheck' type='checkbox' onChange={this.stockFilter} checked={this.state.filter} />
                    <label htmlFor='filterCheck'>Only show products in stock</label>
                </div>
                <ItemList products={this.state.products} />
            </div>
        )
    }
}