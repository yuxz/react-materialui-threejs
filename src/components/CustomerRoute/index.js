import React, { Component,Fragment} from 'react'

export default function CustomizedRoute(props)  {
  
	const {render} = props;
	console.log("CustomizedRoute",render())
	return (
		<Fragment>
			{
				render()
			}
		</Fragment>
	)	 
}
