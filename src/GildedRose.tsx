import React from "react";
import ShopItemTable, { Item } from "./components/ShopItemTable";
import { items } from "./data/shopItems";
import { Shop } from "./api/gilded_rose";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import WelcomeMessage from "./components/WelcomeMessage";

interface Props {}

interface State {
  items: Item[];
  onSaleItems: Item[];
  discountItems: Item[];
}

const shop = new Shop(items);

class GildedRose extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      items: shop.items,
      onSaleItems: shop.items,
      discountItems: shop.discountItems,
    };
    //console.log("Initial Shop state: ", this.state.items);
  }

  updateShowQuality() {
    shop.updateQuality();
    shop.updateItemLists();
    console.log("Shop State after update:", shop);

    this.setState({
      items: shop.items,
      onSaleItems: shop.onSaleItems,
      discountItems: shop.discountItems,
    });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <Navbar bg="light">
                <Navbar.Brand href="#home">The Gilded Rose </Navbar.Brand>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col>
              <WelcomeMessage />
            </Col>
          </Row>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="sale"
                id="uncontrolled-tab-example"
                data-testid="tabs-section"
              >
                <Tab
                  eventKey="sale"
                  title={
                    <React.Fragment>
                      On Sale{" "}
                      <Badge variant="info" data-testid="sale-header">
                        {this.state.onSaleItems.length}
                      </Badge>
                    </React.Fragment>
                  }
                >
                  <Card>
                    <ShopItemTable items={this.state.onSaleItems} />
                  </Card>
                </Tab>
                <Tab
                  eventKey="discount"
                  title={
                    <React.Fragment>
                      Discount{" "}
                      <Badge variant="info" data-testid="discount-header">
                        {this.state.discountItems.length}
                      </Badge>
                    </React.Fragment>
                  }
                >
                  <ShopItemTable items={this.state.discountItems} />
                </Tab>
              </Tabs>
              <Button
                onClick={this.updateShowQuality.bind(this)}
                id="updateButton"
                data-testid="update-button"
              >
                Update Quality
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default GildedRose;
