'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, FormEvent } from 'react';
import { User } from 'react-feather';
import { CldUploadButton } from 'next-cloudinary';
import { Button } from '@/components/buttons';

export default function Settings() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      return data;
    };

    getUser()
      .then(data => {
        setUsername(data.user.name);
        setImage(data.user.image);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

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
          router.refresh();
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, [image]);

  const handleNameUpdate = async () => {
    setEditMode(!editMode);
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username }),
      });
      const data = await res.json();
      router.refresh();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('data', data);
      router.push('/');
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-4">
      <h2 className="mb-6 text-2xl font-semibold">User Settings</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="username" className="text-md mt-6 block font-medium">
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
            <p className="mt-1 w-full px-3 py-2">{username}</p>
          )}
        </div>
        <div className="flex">
          <Button
            intent={editMode ? 'secondary' : 'tertiary'}
            onClick={() => setEditMode(!editMode)}
            className="mr-4"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
          {editMode && (
            <Button intent="primary" onClick={handleNameUpdate}>
              Save
            </Button>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-md mb-1 block font-medium">Profile picture</h3>
        <div className="flex flex-col items-start gap-4">
          {image ? (
            <Image
              src={image}
              alt="profile"
              width={96}
              height={96}
              className="rounded-md"
            />
          ) : (
            <User className="h-20 w-20 rounded-full" />
          )}

          <div className="rounded-full border-2 border-secondary px-6 py-2 text-lg font-medium text-secondary shadow-sm transition duration-200 ease-in-out hover:translate-y-0.5 hover:opacity-90 hover:shadow-md active:translate-y-0.5">
            <CldUploadButton
              uploadPreset="ketomarket_profile_pic"
              onUpload={(res: any) => {
                setImage(res.info.secure_url);
              }}
            >
              Upload new image
            </CldUploadButton>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-1 block border-t-4 border-tertiary pt-4 text-xl font-bold text-tertiary">
          Danger zone
        </h3>
        <form className="mt-6" onSubmit={handleDeleteAccount}>
          <Button intent="secondary">Delete account</Button>
        </form>
      </div>
    </section>
  );
}
