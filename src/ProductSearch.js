import React, { Component } from "react";

class ProductDisplay extends Component {
    render() {
        let offertDiv = <>
            <ul>
                <div><h3> Precio Oferta  : &#36; {this.props.product.onSalePrice}</h3></div>
            </ul>
            <ul>
                <div><strike><h3> Precio Original: &#36; {this.props.product.price}</h3></strike></div>
            </ul>
        </>;
        let normalPriceDic = <>
            <div> Precio : {this.props.product.price}</div>
        </>;
        let div = <div>
            <div><h2>{this.props.product.brand}-{this.props.product.description}</h2></div>
            <img src={this.props.product.image} alt="product"/>

            {(this.props.product.onSalePrice === this.props.product.price) ?
                normalPriceDic
                :
                offertDiv}
        </div>;
        return div;
    }
}

class ProductSearch extends Component {
    state = { searchValue: '', meals: []};

    handleOnChange = event => {
        this.setState({searchValue: event.target.value});
    };

    handleSearch = () => {
        console.log("Buscando :"+this.state.searchValue);
        this.makeApiCall(this.state.searchValue);
    }

    makeApiCall = searchInput => {
        const url = `http://localhost:8080/api/v1/products/search`;
        var searchUrl = `${url}?query=${searchInput}`;
        fetch(searchUrl).then(response => {
            return response.json();
        }).then(jsonData => {
            console.log(jsonData);
            this.setState({ meals: jsonData });
        });
    };

    render() {
        return (
            <div>
                <h1>Challenge : Walmart Product Search</h1>
                <input
                    name="text"
                    type="text"
                    placeholder="Buscar"
                    onChange = { event => this.handleOnChange(event)}
                    value = {this.state.searchValue} />
                <button
                    onClick={this.handleSearch}>Buscar</button>
                {this.state.meals.data ?
                (
                    <div>
                    {this.state.meals.data.map((product, index)=>
                        <ProductDisplay key={index} product={product}/>)}
                    </div>
                )
                :
                (
                    <p>Por favor indicar un termino de busqueda</p>
                )}
            </div>
        );
    }
}

export default ProductSearch;