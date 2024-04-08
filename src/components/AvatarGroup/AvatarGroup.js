import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import viewsPalette from 'theme/palette';
import styled from './styles';
import AvatarList from './components/AvatarList';

const AvatarGroup = ({ users = [], usersToDisplay = 5, showFull = false }) => {
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
				<Avatar firstname="+" lastname={`${extraCountActualIndex}`} mainColor={viewsPalette.blue} />
			)}
		</styled.AvatarGroup>
	);
};

AvatarGroup.propTypes = {
	users: PropTypes.arrayOf(PropTypes.object),
	usersToDisplay: PropTypes.number,
	showFull: PropTypes.bool
};

export default React.memo(AvatarGroup);
