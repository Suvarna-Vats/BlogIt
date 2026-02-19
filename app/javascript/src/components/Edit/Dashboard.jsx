import React, { useEffect, useState } from "react";

import { Spinner, Typography } from "@bigbinary/neetoui";
import DashboardPostsTables from "components/Edit/dashboard/index";
import { useHistory } from "react-router-dom";
import { fetchMyPosts } from "src/apis/posts";

const Dashboard = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMyPosts();
        setPosts(response?.data?.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleEdit = slug => history.push(`/blogs/${slug}/edit`);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Typography component="h1" style="h1" weight="bold">
          Edit posts
        </Typography>
      </div>
      {isLoading ? (
        <div className="grid place-items-center py-24">
          <Spinner />
        </div>
      ) : (
        <DashboardPostsTables posts={posts} onEdit={handleEdit} />
      )}
    </>
  );
};

export default Dashboard;
