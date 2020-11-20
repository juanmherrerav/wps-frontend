import React, { Component } from "react";
import classes from './ProductSearch.css';

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
            {this.getProductTitle()}
            {this.getProductImage()}

            {(this.props.product.onSalePrice === this.props.product.price) ?
                normalPriceDic
                :
                offertDiv}
        </div>;
        return div;
    }

    getProductImage() {
        return <img src={`http://${this.props.product.image}`} alt="product"/>;
    }

    getProductTitle() {
        return <div><h2>{this.props.product.brand}-{this.props.product.description}</h2></div>;
    }
}

class MainWindow extends Component {
    render() {
        return <div>
            <div class={classes.headerInfo}>
                <div class={classes.headerWrapper}>
                    <h1>Challenge : Walmart Product Search</h1>
                    <input
                        name="text"
                        type="text"
                        placeholder="Buscar"
                        onChange={this.props.onChange}
                        value={this.props.value}/>
                    <button
                        onClick={this.props.onClick}>Buscar
                    </button>
                </div>
            </div>
            {this.props.meals.data ?
                (
                    <div>
                        {this.props.meals.data.map(this.props.prop4)}
                    </div>
                )
                :
                (
                    <p>Por favor indicar un termino de busqueda</p>
                )}
        </div>;
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
        //const url = `http://localhost:8080/api/v1/products/search`;
        const url = `https://wps-backend.herokuapp.com/api/v1/products/search`;
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
            <MainWindow onChange={event => this.handleOnChange(event)} value={this.state.searchValue}
                        onClick={this.handleSearch} meals={this.state.meals} prop4={(product, index) =>
                <ProductDisplay key={index} product={product}/>}/>
        );
    }
}

export default ProductSearch;