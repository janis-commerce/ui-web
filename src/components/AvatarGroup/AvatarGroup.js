import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import viewsPalette from 'theme/palette';
import styled from './styles';
import AvatarList from './components/AvatarList';

const AvatarGroup = ({ users, usersToDisplay, showFull, badgeColor }) => {
	const extraCount = users.length > usersToDisplay ? users.length - usersToDisplay : 0;
	const hasExtraCount = extraCount > 0;

	return (
		<styled.AvatarGroup disabled showFull={showFull}>
			<AvatarList
				userList={users}
				hasExtraCount={hasExtraCount}
				extraCount={extraCount}
				showFull={showFull}
			/>
			{hasExtraCount && <Avatar firstname="+" lastname={`${extraCount}`} mainColor={badgeColor} />}
		</styled.AvatarGroup>
	);
};

AvatarGroup.propTypes = {
	/** Data de usuarios para los avatar */
	users: PropTypes.arrayOf(PropTypes.object),
	/** Cantidad de usuarios que se verá el Avatar */
	usersToDisplay: PropTypes.number,
	/** Muestra la lista de Avatars en tamaño completo */
	showFull: PropTypes.bool,
	/** Color del fondo del Avatar en caso de mostrar mas */
	badgeColor: PropTypes.string
};

AvatarGroup.defaultProps = {
	badgeColor: viewsPalette.blue,
	users: [],
	usersToDisplay: 5,
	showFull: false
};

export default React.memo(AvatarGroup);
