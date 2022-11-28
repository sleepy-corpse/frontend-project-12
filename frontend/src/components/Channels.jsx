import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';

export default function Channels() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectEntities);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const addChannel = () => {
    dispatch(modalActions.openModal({ type: 'addChannel' }));
  };

  const renameChannel = (id) => {
    dispatch(modalActions.openModal({
      type: 'renameChannel',
      extra: {
        channelId: id,
      },
    }));
  };

  const removeChannel = (id) => {
    dispatch(modalActions.openModal({
      type: 'removeChannel',
      extra: {
        channelId: id,
      },
    }));
  };

  const handleChannelSwitch = (id) => () => {
    dispatch(channelsActions.switchChannel(id));
  };

  const renderButton = (channel) => (
    <Button
      variant={channel.id === selectedChannelId ? 'secondary' : ''}
      className="w-100 text-light text-truncate rounded-0 text-start"
      onClick={handleChannelSwitch(channel.id)}
    >
      <span className="me-1">
        {'# '}
      </span>
      {channel.name}
    </Button>
  );

  const renderDropdown = (channel) => (
    <Dropdown as={ButtonGroup} className="d-flex">
      {renderButton()}
      <Dropdown.Toggle
        split
        variant={channel.id === selectedChannelId ? 'secondary' : ''}
        className="text-light"
      />
      <Dropdown.Menu className="super-colors">
        <Dropdown.Item onClick={() => renameChannel(channel.id)}>{t('chat.dropdown.rename')}</Dropdown.Item>
        <Dropdown.Item onClick={() => removeChannel(channel.id)}>{t('chat.dropdown.delete')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <Col xs={4} md={2} className="my-bg-sidebar px-0 border-end border-3 h-100 overflow-y-auto">
      <div className="d-flex justify-content-between pt-5 pb-2 ps-4 pe-2">
        <span className="fst-italic fw-bold">{t('chat.channelsHeader')}</span>
        <button type="button" onClick={addChannel} className="my-icon-btn text-light btn btn-group-vertical p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1
              1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0
              0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>
      </div>
      <Nav as="ul" variant="px-2 flex-column" fill>
        {Object.values(channels).map((channel) => (
          <Nav.Item as="li" key={channel.id} className="w-100">
            {channel.removable ? renderDropdown(channel) : renderButton(channel)}
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
}
