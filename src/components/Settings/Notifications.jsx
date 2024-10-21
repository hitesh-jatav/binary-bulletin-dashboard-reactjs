import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const Notifications = () => {
  // Single state object for all notification settings
  const [settings, setSettings] = useState({
    emailNotification: false,
    appNotification: false,
    friendRequestNotification: false,
    messageNotification: false,
    likedNotification: false,
    commentedNotification: false,
    repliedToCommentNotification: false,
  });

  // Handler for toggling settings
  const handleChange = (event) => {
    const { id, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: checked,
    }));
  };

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="emailNotification">
                Send Email Notification
              </Form.Label>
            </Col>
            <Col xs={3} className="text-right">
              <Form.Check
                type="switch"
                id="emailNotification"
                checked={settings.emailNotification}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="appNotification">
                Send App Notification on Job Completion
              </Form.Label>
            </Col>
            <Col xs={3} className="text-right">
              <Form.Check
                type="switch"
                id="appNotification"
                checked={settings.appNotification}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="friendRequestNotification">
                Notification on Friend Request Sent
              </Form.Label>
            </Col>
            <Col xs={3} className="text-right">
              <Form.Check
                type="switch"
                id="friendRequestNotification"
                checked={settings.friendRequestNotification}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="messageNotification">
                Notification on New Message
              </Form.Label>
            </Col>
            <Col xs={3} className="text-right">
              <Form.Check
                type="switch"
                id="messageNotification"
                checked={settings.messageNotification}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="likedNotification">
                Notification on New Like
              </Form.Label>
            </Col>
            <Col xs={3} className="text-right">
              <Form.Check
                type="switch"
                id="likedNotification"
                checked={settings.likedNotification}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="commentedNotification">
                Notification on New Comment
              </Form.Label>
            </Col>
            <Col xs={3} className="text-right">
              <Form.Check
                type="switch"
                id="commentedNotification"
                checked={settings.commentedNotification}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Label htmlFor="repliedToCommentNotification">
                Notification on Reply to Comment
              </Form.Label>
            </Col>
            <Col xs={3} className="text-right">
              <Form.Check
                type="switch"
                id="repliedToCommentNotification"
                checked={settings.repliedToCommentNotification}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Settings
        </Button>
      </Form>
    </Container>
  );
};

export default Notifications;
