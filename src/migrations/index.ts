import * as migration_20260303_010821 from './20260303_010821';
import * as migration_20260303_020005 from './20260303_020005';
import * as migration_20260303_022330 from './20260303_022330';
import * as migration_20260718_users_name from './20260718_users_name';

export const migrations = [
  {
    up: migration_20260303_010821.up,
    down: migration_20260303_010821.down,
    name: '20260303_010821',
  },
  {
    up: migration_20260303_020005.up,
    down: migration_20260303_020005.down,
    name: '20260303_020005',
  },
  {
    up: migration_20260303_022330.up,
    down: migration_20260303_022330.down,
    name: '20260303_022330',
  },
  {
    up: migration_20260718_users_name.up,
    down: migration_20260718_users_name.down,
    name: '20260718_users_name',
  },
];
