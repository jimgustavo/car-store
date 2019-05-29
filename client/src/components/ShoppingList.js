import React from "react";
import Axios from "axios";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: [
        { productName: "ipadPRO", keywords: "tablet" },
        { productName: "Iphone X", keywords: "cellphone" },
        { productName: "Samsung Galaxi Tab", keywords: "tablet" },
        { productName: "Samsung S9", keywords: "cellphone" },
        { productName: "ASUS", keywords: "laptop" }
      ]
    };
	this.clickOnSoftware = this.clickOnSoftware.bind(this);
	this.clickOnSeguridad = this.clickOnSeguridad.bind(this);
	//this.clickOnSoftware = this.clickOnManuales.bind(this);
  }

componentDidMount() {
    Axios.get("/api/stock")
      .then(res => {
        const stock = res.data;
        this.setState({ stock });
        console.log(stock);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

clickOnSoftware() {
    Axios.get("/api/stock/software")
      .then(res => {
        const stock = res.data;
        this.setState({ stock });
        console.log(stock);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

clickOnSeguridad() {
    Axios.get("/api/stock/seguridad")
      .then(res => {
        const stock = res.data;
        this.setState({ stock });
        console.log(stock);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

clickOnManuales() {
    Axios.get("/api/stock/manuales")
      .then(res => {
        const stock = res.data;
        this.setState({ stock });
        console.log(stock);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.stock);
    return (
   <div>
    <div className="button-bar">
    <button onClick={this.clickOnSoftware}>SOFTWARE</button>
    <button onClick={this.clickOnSeguridad}>SEGURIDAD</button>
    <button onClick={this.clickOnManuales}>MANUALES</button>
    </div>
      <div className="grid-container">
        <div className="grid">
          {this.state.stock.map(
            ({ productName, description, keywords, image, price }) => (
              <div className="card">
                <h2>{productName}</h2>
                <img
                  src={image}
                  title={productName}
                  height={180}
                  width={180}
                  alt={"Sorry!, this toy has an error!"}
                />
                <div>{description}</div>
                <div>{keywords}</div>
                <div>{price}</div>
                <button>Comprar</button>
              </div>
            )
          )}
        </div>
      </div>
   </div>
    );
  }
}
export default ShoppingList;
