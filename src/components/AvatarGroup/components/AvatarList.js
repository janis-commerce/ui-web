import React from 'react';
import Avatar from 'components/Avatar';

const AvatarList = ({ userList, hasExtraCount, extraCount }) =>
	userList.map(({ firstname, lastname, url, id, mainColor }, index) => {
		if (hasExtraCount && index < extraCount) return null;
		return (
			<Avatar key={id} firstname={firstname} lastname={lastname} url={url} mainColor={mainColor} />
		);
	});

export default AvatarList;
