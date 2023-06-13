'use client';

import { useState, useEffect } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { Button } from '@/components/buttons';

export default function Settings() {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const postProfileImage = async () => {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      return data;
    };
    if (image) {
      postProfileImage()
        .then(data => {
          console.log('data', data);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, [image]);

  return (
    <section className="py-4">
      <h2 className="mb-6 text-2xl font-semibold">User Settings</h2>
      <Button
        intent={editMode ? 'secondary' : 'tertiary'}
        onClick={() => setEditMode(!editMode)}
        className="mr-4"
      >
        {editMode ? 'Cancel' : 'Edit'}
      </Button>
      {editMode && <Button intent="primary">Save</Button>}

      <div>
        <label htmlFor="username" className="mt-6 block text-sm font-medium">
          Name
        </label>
        {editMode ? (
          <input
            id="username"
            type="text"
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={!editMode}
          />
        ) : (
          <p className="mt-1 w-full rounded-md border px-3 py-2">{username}</p>
        )}
      </div>
      <div>
        <CldUploadButton
          uploadPreset="ketomarket_profile_pic"
          onUpload={(res: any) => {
            console.log('Cloudinary res', res);
            setImage(res.info.secure_url);
          }}
        />
      </div>
    </section>
  );
}
