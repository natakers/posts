export const isLiked = (likes: string[], userId: string) => likes.some(id => id === userId);

export const tabs = [
	{
	  id: "popular",
	  title: "Популярные",
	},
	{
	  id: "date",
	  title: "По дате",
	},
	{
	  id: "author",
	  title: "По названию",
	},
  ];