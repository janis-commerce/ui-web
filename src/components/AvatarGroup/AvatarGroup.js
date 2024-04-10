import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import viewsPalette from 'theme/palette';
import styled from './styles';
import AvatarList from './components/AvatarList';

const AvatarGroup = ({ users = [], usersToDisplay = 5, showFull = false, badgeColor }) => {
	const extraCount = users.length > usersToDisplay + 1 ? users.length - (usersToDisplay + 1) : 0;
	const extraCountActualIndex = extraCount + 1;
	const hasExtraCount = extraCount > 0;

	return (
		<styled.AvatarGroup disabled showFull={showFull}>
			<AvatarList
				userList={users}
				hasExtraCount={hasExtraCount}
				extraCountActualIndex={extraCountActualIndex}
				showFull={showFull}
			/>
			{hasExtraCount && (
				<Avatar firstname="+" lastname={`${extraCountActualIndex}`} mainColor={badgeColor} />
			)}
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
	badgeColor: viewsPalette.blue
};

export default React.memo(AvatarGroup);
