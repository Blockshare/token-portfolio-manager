import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
export default () => (
    <Container>
      <Row className="mt-3">
        <Col>
          <Link to="/">← Back</Link>
        </Col>
      </Row>
      <Row className="mt-3">
        <h3>About</h3>
        <p>Blockshare.io is a cryptocurrency portfolio tracker on top
          of <a target="_blank"    href="https://blockstack.org">Blockstack</a> platform.
        </p>
      </Row>
    </Container>
)
