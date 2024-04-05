import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import viewsPalette from 'theme/palette';
import styled from './styles';

const AvatarGroup = ({ users = [], usersToDisplay = 5, showFull = false }) => {
	const extraCount = users.length > usersToDisplay ? users.length - usersToDisplay : 0;
	const extraCountActualIndex = extraCount + 1;
	const hasExtraCount = extraCount > 0;

	const renderAvatars = (userList) =>
		userList.map(({ firstname, lastname, url, id }, index) => {
			if (hasExtraCount && index < extraCountActualIndex) return null;
			return (
				<Avatar
					key={id}
					firstname={firstname}
					lastname={lastname}
					url={url}
					size={showFull ? 'large' : 'small'}
				/>
			);
		});

	return (
		<styled.AvatarGroup disabled showFull={showFull}>
			{renderAvatars(users)}
			{hasExtraCount && (
				<styled.ExtraButton>
					<Avatar
						firstname="+"
						lastname={`${extraCountActualIndex}`}
						mainColor={viewsPalette.blue}
					/>
				</styled.ExtraButton>
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
